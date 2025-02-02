import {useState} from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Card,
    CardContent,
    CardHeader,
    ModalHeader,
    ModalContent,
    Button,
    Modal,
    Checkbox,
    FormField,
    Form,
    Input,
    Label,
} from 'semantic-ui-react';


import './App.css'
import {Expense, Category} from "./models/expense.js";

const initialExpenses = [new Expense("Whiskers Cat food", Category.Food.name, 10), new Expense("Self cleaning cat Litter box", Category.Furniture.name, 500), new Expense("Diamond Cat collar", Category.Accessory.name, 1000),];

function App() {
    const [expenses, setExpenses] = useState(initialExpenses);

    // add expense logic
    const [showModal, setShowModal] = useState(false)

    // form to add a new expense
    const baseExpense = {
        item: '', category: Category.Food.name, amount: '',
    };
    const [newExpense, setNewExpense] = useState(baseExpense);
    const handleFormInputChange = (name, value) => setNewExpense({...newExpense, [name]: value})
    const resetExpenseForm = () => {
        setNewExpense(baseExpense);
    };

    // expensesToDelete = [expenseName1, expenseName2]
    // this list contains the list of expenses to be removed. We can delete this by name
    const [expensesToDelete, setExpensesToDelete] = useState([]);
    const handleExpenseCheck = (expenseName, e, {checked}) => {
        console.log('paul: handleExpenseCheck: ', expenseName);
        if (checked) {
            // make sure this expense to delete is store here
            setExpensesToDelete([...expensesToDelete, expenseName])
        } else {
            // make sure this expense is marked to be deleted
            setExpensesToDelete(expensesToDelete.filter(currentName => currentName !== expenseName));
        }
    };
    const deleteSelectedExpenses = () => {
        // remove all expense with the same item names as our delete array
        setExpenses(expenses.filter(exp => {
            for (let itemName of expensesToDelete) {
                if (exp.item === itemName) {
                    return false;
                }
            }
            return true;
        }));
        setExpensesToDelete([]);
    };

    return (<>
        <div className="h-full w-screen">
            <Modal
                size="small"
                open={showModal}
                onClose={() => {
                    resetExpenseForm();
                    setShowModal(false);
                }}
                onOpen={() => setShowModal(true)}
            >
                <ModalHeader>Add a new expense</ModalHeader>
                <ModalContent>
                    <Form onSubmit={() => {
                        const expenseToAdd = new Expense(newExpense.item, newExpense.category, newExpense.amount);
                        setExpenses([...expenses, expenseToAdd]);
                        resetExpenseForm();
                        setShowModal(false);
                    }}>
                        <FormField>
                            <label>Item</label>
                            <input placeholder='Item Name' value={newExpense.item} onChange={e => {
                                handleFormInputChange('item', e.target.value)
                            }}/>
                        </FormField>
                        <FormField label='Categroy' control='select' value={newExpense.category} onChange={e => {
                            handleFormInputChange('category', e.target.value)
                        }}>
                            {Object.keys(Category).map(name => (<option key={name} value={name}>{name}</option>))}
                        </FormField>
                        <FormField>
                            <label>Amount</label>
                            <Input labelPosition='right' type='text' placeholder='Item amount'>
                                <Label basic>$</Label>
                                <input value={newExpense.amount} onChange={e => {
                                    handleFormInputChange('amount', e.target.value)
                                }}/>
                                <Label>.00</Label>
                            </Input>
                        </FormField>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </ModalContent>
            </Modal>
            <Card className="!w-4xl">
                <CardContent>
                    <CardHeader>
                        <h1 className="text-3xl font-bold">
                            Manage your expense
                        </h1>
                    </CardHeader>
                    <div className="flex">
                        <Button color='blue' onClick={() => setShowModal(true)}>Add Expense</Button>
                        <Button color='red' onClick={() => deleteSelectedExpenses()}>Delete Expense(s)</Button>
                    </div>
                    <div>
                        <div>
                            RIP:
                            <div>EXP delete: {expensesToDelete.length}</div>
                            <div>EXP: {expenses.length}</div>
                        </div>
                        <div>
                            Debug
                            <ul>
                                <li>{newExpense.item}</li>
                                <li>{newExpense.amount}</li>
                                <li>{newExpense.category}</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Table size='small'>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell></TableHeaderCell>
                                    <TableHeaderCell>Item</TableHeaderCell>
                                    <TableHeaderCell>Category</TableHeaderCell>
                                    <TableHeaderCell>Amount</TableHeaderCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {expenses.map(exp => (<TableRow key={exp.item}>
                                    <TableCell>
                                        <Checkbox onChange={(event, params) => {
                                            handleExpenseCheck(exp.item, event, params)
                                        }}/>
                                    </TableCell>
                                    <TableCell>{exp.item}</TableCell>
                                    <TableCell>{exp.category}</TableCell>
                                    <TableCell>{exp.amount}$</TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </>);
}

export default App
