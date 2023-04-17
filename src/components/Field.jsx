import { Box, Button, Flex, FormControl, FormLabel, Select, Switch, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const Field = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  handleEditNodeType,
  handleEditNodeStatus,
  fieldsData,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [expand, setExpand] = useState(false);
    const inputRef = useRef(null);
    const [show,setShow]=useState(false)


    const onAddField=()=>{
        if(editMode){
            handleEditNode(fieldsData.id,inputRef?.current?.innerText)
            setEditMode(false)
        }else{
            handleInsertNode(fieldsData.id, "newField");
        }
        setExpand(!expand)
    }
     useEffect(() => {
       inputRef?.current?.focus();
     }, [editMode]);

      const handleDelete = () => {
        handleDeleteNode(fieldsData.id);
      };

  
  return (
    <Box>
      <Box padding="5px" bgColor={show?"lightGrey":"transparent"} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
        {fieldsData.id === 1 ? (
          <>
            <Button onClick={onAddField}>
              <Flex gap="5px">
                <img src="https://img.icons8.com/material-rounded/20/null/plus-2-math--v1.png" />
                <Text>Add</Text>
              </Flex>
            </Button>
          </>
        ) : (
          <>
            <Flex justifyContent={"space-between"}>
              <Flex gap="10px">
                <span
                  onClick={() => setEditMode(true)}
                  contentEditable={editMode}
                  suppressContentEditableWarning={editMode}
                  ref={inputRef}
                >
                  {fieldsData.name}
                </span>
                {editMode ? <Button onClick={onAddField}>Save</Button> : ""}
                <Select
                  value={fieldsData.type}
                  onChange={(e) => {
                    handleEditNodeType(fieldsData.id, e.target.value);
                  }}
                >
                  <option value="Object">Object</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                </Select>
              </Flex>

              <Flex display={show?"Flex":"None"}>
                <Flex gap="5px">
                  <Text>Required</Text>
                  <Switch
                    size="md"
                    onChange={() =>
                      handleEditNodeStatus(
                        fieldsData.id,
                        !fieldsData.isRequired
                      )
                    }
                    isChecked={fieldsData.isRequired}
                  />
                </Flex>
                {fieldsData.type === "Object" ? (
                  <Button bgColor="transparent" onClick={onAddField}>
                    <img src="https://img.icons8.com/material-rounded/20/null/plus-2-math--v1.png" />
                  </Button>
                ) : (
                  ""
                )}
                <Button bgColor="transparent" onClick={handleDelete}>
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/20/null/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png" />
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
      <Box paddingLeft={25}>
        {fieldsData?.fields?.map((field) => {
          return (
            <Field
              key={field.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              handleEditNodeType={handleEditNodeType}
              handleEditNodeStatus={handleEditNodeStatus}
              fieldsData={field}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Field