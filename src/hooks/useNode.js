const useNode = () => {
  const insertNode = function (tree, fieldId, item) {
    if (tree.id === fieldId) {
      tree.fields.push({
        id: new Date().getTime(),
        name: item,
        isRequired: true,
        type:"String",
        fields: [],
      });

            return tree;
    }

    let latestNode = [];
    latestNode = tree.fields.map((ob) => {
      return insertNode(ob, fieldId, item);
    });

    return { ...tree, fields: latestNode };
  };

  const editNode = (tree, fieldId, value) => {
    if (tree.id === fieldId) {
      tree.name = value;
      return tree;
    }
        tree.fields.map((ob) => {
      return editNode(ob, fieldId, value);
    });

    return { ...tree };
  };

   const editNodeType = (tree, fieldId, value) => {
     if (tree.id === fieldId) {
       tree.type = value;
       return tree;
     }
     
     tree.fields.map((ob) => {
       return editNodeType(ob, fieldId, value);
     });

     return { ...tree };
   };

   const editNodeStatus=(tree,fieldId,value)=>{
     if (tree.id === fieldId) {
       tree.isRequired = value;
       return tree;
     }

     tree.fields.map((ob) => {
       return editNodeStatus(ob, fieldId, value);
     });

     return { ...tree };
   }

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.fields.length; i++) {
      const currentItem = tree.fields[i];
      if (currentItem.id === id) {
        tree.fields.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode,editNodeType,editNodeStatus };
};

export default useNode;
