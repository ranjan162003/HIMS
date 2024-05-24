import React, { Children } from 'react';
import { useEffect,createContext,useReducer } from 'react'
import axios from 'axios';



export const IssueContext = createContext(null)
// export const EditPostContext = createContext(null)

function issueReduce(issue,action){
    switch(action.type){
        case 'userLogin':
                let a=issue
                a.rollNumber=action.payload.rollNumber
                a.name=action.payload.name
                return a
        case 'setAccessory':
            let b=issue
            b.accessory=action.payload.accessory
            return b
        case 'setIssueCategory':
            let c=issue
            c.issueCategory=action.payload.issueCategory
            return c
        case 'setAdditionalDetails':
            let d=issue
            d.issueDescription=action.payload.issueDescription
            return d
        case 'setIssueType':
            let e=issue
            e.issueType=action.payload.issueType
            return e
        case 'issueCreation':
            return {rollNumber:issue.rollNumber,name:issue.name,issueCategory:null,accessory:null,issueType:null,issueDescription:" "}
        case 'userLogout':
            return {rollNumber:null,name:null,issueCategory:null,accessory:null,issueType:null,issueDescription:" "}
    }
}

// function editPostReduce(editPosts,action){
//     switch(action.type){
//         case 'setEditPost':
//             return action.payload.item
//         case 'clearEditPost':
//             return null
//     }
// }

export default function MainContext({ children }) {
    // let [post, setPost] = useState([{userId: 1, id: 2, title: 'qui est esse', body: 'est rerum tempore vitae\nsequi sint nihil reprehend…aperiam non debitis possimus qui neque nisi nulla'}]);
    // let a={rollNumber:null,issueCategory:null,accessory:null,issueType:null,issueDescription:" "}
    let [issue,issueDispatch] = useReducer(issueReduce,{rollNumber:null,name:null,issueCategory:null,accessory:null,issueType:null,issueDescription:" "})
    // let [editPosts,editDispatch] = useReducer(editPostReduce,null)
    // useEffect(() => {

    //         async function fetchData(){
    //             let a = await axios.get('https://jsonplaceholder.typicode.com/posts')

    //             postDispatch({type:'initialPost',payload:{data:a.data.slice(0,10)}})
    //         }
    //         fetchData()
    //     }, []);

    return(
        <IssueContext.Provider value={{issue,issueDispatch}}>
                {children}
        </IssueContext.Provider>
    )
}
