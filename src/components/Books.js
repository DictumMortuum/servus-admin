import { useRef, useEffect, useState } from "react";
import {
  TextField,
  List,
  Datagrid,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  useInput
} from 'react-admin';
import {Html5QrcodeScanner} from "html5-qrcode"
import { TextField as MuiTextField } from '@mui/material';

export const BooksList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="writer" />
      <TextField source="publisher" />
      <TextField source="isbn" />
    </Datagrid>
  </List>
);

export const BooksCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="writer" />
      <TextInput source="publisher" />
      <BarcodeInput source="isbn" label="ISBN" />
    </SimpleForm>
  </Create>
);

const BarcodeInput = (props) => {
  const { source, ...rest } = props;
  const [, setText] = useState("");
  const { field } = useInput({ source, ...props });
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qrcode", { fps: 30, qrbox: 250 });
    scannerRef.current.render((decodedText, decodedResult) => {
      field.onChange(decodedText);
      setText(decodedText);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MuiTextField {...field} label={props.label} {...rest} />
      <div id="qrcode">qr code container</div>
    </>
  );
};

export const BooksEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="writer" />
      <TextInput source="publisher" />
      <TextInput source="isbn" />
    </SimpleForm>
  </Edit>
);
