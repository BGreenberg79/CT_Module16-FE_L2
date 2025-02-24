import React, { ChangeEvent, useEffect, useState } from "react";
import axios from 'axios'
import { Button, Container, Form } from "react-bootstrap";

interface PostData {
    title: string;
    body: string;
}

interface Comment {
    title: string;
    body: string;
}

const BlogPost: React.FC = () => {
    const [postData, setPostData] = useState<PostData | null>(null)
    const [commentBody, setCommentBody] = useState('')
    const [commentTitle, setCommentTitle] = useState('')
    const [commentList, setCommentList] = useState<Comment[]>([])

    const MainPost = async () => {
        const response = await axios.get<PostData>('https://jsonplaceholder.typicode.com/posts/1')
        setPostData(response.data)
        return response.data
    } 

    useEffect(() => {
        MainPost()
    }, [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const newComment = {title: commentTitle, body: commentBody}
        setCommentList((prevComments) => [...prevComments, newComment]);
        setCommentBody('');
        setCommentTitle('')
    }

    return(
        <Container>
            {postData? (
                <div>
                    <p>Post Title: {postData.title}</p>
                    <p>Body: {postData.body}</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label htmlFor="commentTitle">Comment Title:</Form.Label>
                        <Form.Control
                        id="commentTitle"
                        type='text'
                        value={commentTitle}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => (setCommentTitle(e.target.value))}
                        />
                        <Form.Label htmlFor="commentBody">Comment Body:</Form.Label>
                        <Form.Control
                        id="commentBody"
                        type='text'
                        value={commentBody}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => (setCommentBody(e.target.value))}
                        />
                        <Button type='submit'>Submit</Button>
                    </Form>
            </div>
        ) : (<p>Loading...</p>)
            }
            <div>
                <h3>Comments</h3>
                {commentList.map((comment, index) => (
                    <div key={index}>
                        <h5>
                            {comment.title}
                        </h5>
                        <p>{comment.body}</p>
                    </div>

                ))}
            </div>
        </Container>
    )
}

export default BlogPost