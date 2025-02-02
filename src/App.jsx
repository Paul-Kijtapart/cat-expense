import {useState} from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Checkbox,
    Card,
    CardContent,
    CardHeader
} from 'semantic-ui-react';

import {Button} from 'semantic-ui-react'

import './App.css'
import {Expense, Category} from "./models/expense.js";

const initialExpenses = [
    new Expense("Whiskers Cat food", Category.Food.name, 10),
    new Expense("Self cleaning cat Litter box", Category.Furniture.name, 500),
    new Expense("Diamond Cat collar", Category.Accessory.name, 1000),
];

function App() {
    const [expenses, setExpenses] = useState(initialExpenses);

    // expensesToDelete = [expenseName1, expenseName2]
    // this list contains the list of expenses to be removed. We can delete this by name
    const [expensesToDelete, setExpensesToDelete] = useState([]);
    const handleExpenseCheck = (expenseName, e, {checked}) => {
        console.log('paul: handleExpenseCheck: ', expenseName);
        if (checked) {
            // make sure this expense to delete is store here
            setExpensesToDelete([
                ...expensesToDelete,
                expenseName
            ])
        } else {
            // make sure this expense is marked to be deleted
            setExpensesToDelete(
                expensesToDelete.filter(currentName => currentName !== expenseName)
            );
        }
        console.log('expensesToDelete: ', expensesToDelete)
    };
    return (<>
        <div className="h-full w-screen">
            <Card className="!w-4xl">
                <CardContent>
                    <CardHeader>
                        <h1 className="text-3xl font-bold">
                            Manage your expense
                        </h1>
                    </CardHeader>
                    <div className="flex">
                        <Button color='blue'>Add Expense</Button>
                        <Button color='red'>Delete Expense</Button>
                    </div>
                    <div>
                        RIP:
                        {expensesToDelete}
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
    </>)
}

export default App
