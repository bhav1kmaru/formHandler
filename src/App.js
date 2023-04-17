import { useState } from "react";
import "./App.css";
import Field from "./components/Field";
import { Box, Button, Text } from "@chakra-ui/react";
import useNode from "./hooks/useNode";

const initialState = {
  id: 1,
  fields: [
    {
      id: 2,
      name: "person",
      type: "Object",
      isRequired: true,
      fields: [
        {
          id: 3,
          name: "name",
          type: "Object",
          isRequired: true,
          fields: [
            {
              id: 4,
              name: "firstName",
              type: "String",
              isRequired: true,
              fields: [],
            },
            {
              id: 5,
              name: "lastName",
              type: "String",
              isRequired: true,
              fields: [],
            },
          ],
        },
        {
          id: 6,
          name: "age",
          type: "Number",
          isRequired: true,
          fields: [],
        },
      ],
    },
    {
      id: 7,
      name: "order",
      type: "String",
      isRequired: true,
      fields: [],
    },
    {
      id: 8,
      name: "class",
      type: "Boolean",
      isRequired: true,
      fields: [],
    },
  ],
};
function App() {
  const [fieldsData,setFieldsData]=useState(initialState)
  const { insertNode, editNode, deleteNode,editNodeType,editNodeStatus } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(fieldsData, folderId, item);
    setFieldsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(fieldsData, folderId, value);
    setFieldsData(finalStructure);
  };

  const handleEditNodeType = (folderId, value) => {
    const finalStructure = editNodeType(fieldsData, folderId, value)
    setFieldsData(finalStructure)
  }
  const handleEditNodeStatus = (folderId, value) => {
    const finalStructure = editNodeStatus(fieldsData, folderId, value)
    setFieldsData(finalStructure)
  }
  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(fieldsData, folderId);
    const temp = { ...finalStructure };
    setFieldsData(temp);
  };
  return (
    <Box w="40%" m="auto" mt="200px" border="1px solid" borderRadius={'15px'} padding="10px" textAlign={'center'}>
      <Text>Field name and type</Text>
      <Field
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        handleEditNodeType={handleEditNodeType}
        handleEditNodeStatus={handleEditNodeStatus}
        fieldsData={fieldsData}
      />
      <Button onClick={()=>{console.log(fieldsData)}}>Save</Button>
    </Box>
  );
}

export default App;
