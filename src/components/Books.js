import { useRef, useEffect } from "react";
import {
  TextField,
  List,
  Datagrid,
  Create,
  SimpleForm,
  TextInput,
  Edit,
} from 'react-admin';
import {Html5QrcodeScanner} from "html5-qrcode"

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
      <BarcodeInput source="isbn" />
      <TextInput source="publisher" />
    </SimpleForm>
  </Create>
);

const Scanner = props => {
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qrcode", { fps: 10, qrbox: 250 });
    scannerRef.current.render((decodedText, decodedResult) => {
      console.log(`Scan result: ${decodedText}`, decodedResult);
      scannerRef.current.clear();
    }, (err) => { console.log(err)});
  }, []);

  return (
    <div id="qrcode">qr code container</div>
  )
}

const BarcodeInput = ({ source, label }) => {
  return (
    <>
      <Scanner />
    </>
  );
};

export const BooksEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="publisher" />
    </SimpleForm>
  </Edit>
)
