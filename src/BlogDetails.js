import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/'+id)
    const history = useHistory();

    const handleDelete = (id)=>{
        fetch('http://localhost:8000/blogs/'+id,{
            method: 'DELETE'
        }).then(()=>{
            console.log('blog deleted')
            history.push('/')
        })
    } 

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by : <i>{blog.author}</i></p><br />
                    <p>{blog.body}</p><br />
                    <button onClick={()=>handleDelete(blog.id)}>Delete blog</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;