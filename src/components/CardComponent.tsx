import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useMutation, gql } from '@apollo/client';
import { Draggable } from "react-beautiful-dnd"


const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id:UUID!, $type:type){
    updateTransaction(id: $id, fields:{type: $type} ){
        transaction{
            id
            type
            amount
            date
            description
            category
            owner
        }
    }
  }
`;

type Transaction = {
    id: string,
    type: string,
    amount: string,
    date: string,
    description: string,
    category: string,
    owner: string,
}

type Update = {
    transactionId: String
    update: String
}

export default function CardComponent(props: { setState: React.Dispatch<React.SetStateAction<any>>, transaction: Transaction, index: any, updateState: Update | undefined, onUpdateTransaction: Function, default: boolean, onError: Function }) {
    const [updateTransaction, { data, loading, error }] = useMutation(UPDATE_TRANSACTION);

    React.useEffect(() => {
        if (data) {
            props.onUpdateTransaction(data.updateTransaction.transaction.id, data.updateTransaction.transaction.type)
        }
    }, [data])


    React.useEffect(() => {
        if (props.updateState !== undefined) {
            if (props.updateState.transactionId === props.transaction.id) {
                if (props.updateState.update === "delete") {
                    updateTransaction({ variables: { id: props.transaction.id, status: "delete" } })
                }
                else if (props.updateState.update === "done") {
                    updateTransaction({ variables: { id: props.transaction.id, status: "done" } })
                }
            }
        }
    }, [props.updateState])

    if (error) { props.onError(); }
    if (loading) return <></>;


    return (
        <Draggable draggableId={props.transaction.id} index={props.index} isDragDisabled={props.default}>
            {(provided) => (
                <div draggable {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <Card draggable sx={{ minWidth: "500px", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)", zIndex: 99 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 23, fontWeight: 600, textAlign: "justify" }} color="black" gutterBottom>
                                {props.transaction.amount}
                            </Typography>
                            <Typography sx={{ fontSize: 14, textAlign: "justify" }} color="text.secondary" gutterBottom>
                                {props.transaction.description}
                            </Typography>
                            {/*   <Stack spacing={1} alignItems="left">
                                <Stack direction="row" spacing={1}>
                                    <Chip color="error" label={`P${props.transaction.category}`} sx={{ fontWeight: "600", backgroundColor: "hsl(0deg 86% 97%)", color: "hsl(347deg 77% 56%)" }}></Chip>
                                    {props.transaction.tags.map((tag: any) => {
                                        return <Chip label={tag} key={tag} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
                                    })}
                                </Stack>
                            </Stack> */}
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}