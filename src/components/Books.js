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
      <TextField source="isbn" />
      <TextField source="publisher" />
    </Datagrid>
  </List>
);

export const BooksCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="publisher" />
      <BarcodeInput source="isbn" />
    </SimpleForm>
  </Create>
);

const BarcodeInput = (props) => {
  const { onChange, source, onBlur, ...rest } = props;
  const { field, fieldState: { isTouched, invalid, error }, formState: { isSubmitted }, isRequired } = useInput({ source, onChange, onBlur, ...props });
  const scannerRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qrcode", { fps: 30, qrbox: 250 });
    scannerRef.current.render((decodedText, decodedResult) => { setText(decodedText) });
  }, []);

  return (
    <>
      <MuiTextField
        {...field}
        value={text}
        label={props.label}
        error={(isTouched || isSubmitted) && invalid}
        helperText={(isTouched || isSubmitted) && invalid ? error : ''}
        required={isRequired}
        {...rest}
      />
      <div id="qrcode">qr code container</div>
    </>
  );
};

export const BooksEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="publisher" />
      <BarcodeInput source="isbn" />
    </SimpleForm>
  </Edit>
);
