import React, {useState} from 'react'
import {gql} from 'apollo-boost';
import {useQuery, useMutation} from '@apollo/react-hooks';
import '../components/Library.css'


function Library() {    

    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [authorname, setAuthorname] = useState('');
    const [authoremail, setAuthoremail] = useState('');


    const GET_BOOKS = gql`
    {
        books{
            title
            synopsis
            author{
                name
                email
            }
        }
    }
`  

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $synopsis: String!
    $authorName: String!
    $authorEmail: String!
  ) {
    addBook(
      book: {
        title: $title
        author: { name: $authorName, email: $authorEmail }
        synopsis: $synopsis
      }
    ) {
      id
      title
      synopsis
      author {
        name
        email
      }
    }
  }
`;


    const { loading, error, data } = useQuery(GET_BOOKS);
    const [addBook] = useMutation(ADD_BOOK)

    if(loading){
        console.log(loading)
        // return <p>Loading...</p>
    } 
    if(error){
        console.log(':(')
        //return <p>Error :(</p>  
    } 

    const onAddBook = () => {
        console.log('Hi')
        addBook({
            variables: {
                title: title,
                authorName: authorname,
                authorEmail: authoremail,
                synopsis: synopsis
            },
            refetchQueries : [{
                query: GET_BOOKS
            }]
        });
    }

    return (
        <div>
            <h3>Add Book</h3>
            <input placeholder='Book Tilte'
                type= "text"
                onChange={(e) => setTitle(e.target.value)}
            /> <br/>
            <input placeholder='Book synopsis'
                type= "text"
                onChange={(e) => setSynopsis(e.target.value)} /> <br/>
            <input placeholder='Author Name' 
                 type= "text"
                 onChange={(e) => setAuthorname(e.target.value)} /> <br/>
            <input placeholder='Author Email' 
                type= "text"
                onChange={(e) => setAuthoremail(e.target.value)} /> <br/>
            <button onClick={onAddBook}>Add Book</button>


            <hr/>


            <div className='inputcontainer' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ background: 'black'}}>
                            <th style={{ padding: '20px', color: 'white'}}>Title</th>
                            <th style={{ padding: '20px', color: 'white' }}>Author</th>
                            <th style={{ color: 'white' }}>Synopsis</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        !loading && data.books.map((book, idx) => (
                            <tr style={{ background: 'gray'}} key = {idx}>
                                <td style={{ color: 'white', padding: '10px' }}>{book.title}</td>
                                <td style={{ color: 'white', padding: '10px' }}>{book.author.name}</td>
                                <td style={{ color: 'white', padding: '10px' }}>{book.synopsis}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Library
