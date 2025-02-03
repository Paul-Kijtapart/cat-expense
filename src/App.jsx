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
    Message,
} from 'semantic-ui-react';


import './App.css'
import {Expense, Category} from "./models/expense.js";
import AppExpenseModal from "./AddExpenseModal.jsx";

const initialExpenses = [new Expense("Whiskers Cat food", Category.Food.name, 10), new Expense("Self cleaning cat Litter box", Category.Furniture.name, 500), new Expense("Diamond Cat collar", Category.Accessory.name, 1000),];

function App() {
    const [expenses, setExpenses] = useState(initialExpenses);

    // add expense logic
    const [showModal, setShowModal] = useState(false)

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

    // determine top expenses
    const highestAmount = expenses.reduce((acc, exp) => Math.max(acc, exp.amount), 0);
    const topSpendingCategories = expenses.reduce((acc, exp) => {
        if (exp.amount === highestAmount) {
            acc.add(exp.category);
        }
        return acc;
    }, new Set())
    const isTopSpendingCategory = (category) => {
        return topSpendingCategories.has(category);
    }

    return (<>
        <div className="h-full w-screen">
            {showModal && <AppExpenseModal
                showModal={showModal}
                setShowModal={setShowModal}
                expenses={expenses}
                setExpenses={setExpenses}
            />}
            <div className='flex'>
                <Card className="!w-4xl centered">
                    <CardContent>
                        <CardHeader>Manage your expense</CardHeader>
                    </CardContent>
                    <CardContent>
                        <Button color='violet' onClick={() => setShowModal(true)}>Add Expense</Button>
                        <Button color='violet' onClick={() => deleteSelectedExpenses()}>Delete Expense(s)</Button>
                    </CardContent>
                    <CardContent>
                        <p>Top spending categories are highlighted in <span className='text-green-500'>green</span></p>
                        <p>Top spending categories are the categories with the highest
                            amount: {Array.from(topSpendingCategories).map(cateogory => (
                                <span key={cateogory} className='text-green-500'>{cateogory} </span>))}
                        </p>
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
                                {expenses.map(exp => (
                                    <TableRow key={exp.item} positive={isTopSpendingCategory(exp.category)}>
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
                    </CardContent>
                </Card>

            </div>
        </div>
    </>);
}

export default App
