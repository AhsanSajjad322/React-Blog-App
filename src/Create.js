import {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('yoshi')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e)=>{
        e.preventDefault();
        const blog = { title, body, author }

        setIsPending(true);

        fetch('http://localhost:8000/blogs',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log("new blof added")
            setTimeout(() => {
                setIsPending(false);
                history.push('/')
            }, 500);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Blog title:</label>
                <input type="text" value={title} id="title" required onChange={(e)=>setTitle(e.target.value)}/>
                <label htmlFor="body">Blog body:</label>
                <textarea id="body" value={body} required onChange={(e)=>setBody(e.target.value)}/>
                <label htmlFor="author">Blog author:</label>
                <select id="author" value={author} onChange={(e)=>setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;