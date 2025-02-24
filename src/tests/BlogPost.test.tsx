import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BlogPost from '../components/BlogPost';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('BlogPost', ()=> {
    beforeEach(()=>{
        mockedAxios.get.mockReset();
    });

    it('renders properly', async () => {
        mockedAxios.get.mockResolvedValue({
            data: { title: 'Post Title', body: 'Post Body'}
        });

        render(<BlogPost/>);

        const postTitle = await screen.findByText(/Post Title/);
        const postBody = await screen.findByText(/Post Body/)

        expect(postTitle).toBeInTheDocument();
        expect(postBody).toBeInTheDocument();
    });

    it('handles form input changes', async() => {
        mockedAxios.get.mockResolvedValue({
            data: { title: 'Post Title', body: 'Post body content' }
        });
        render(<BlogPost/>);
        await screen.findByText(/Post Title/);

        const commentTitleInput = screen.getByLabelText('Comment Title:');
        const commentBodyInput = screen.getByLabelText('Comment Body:')

        fireEvent.change(commentTitleInput, { target: { value: 'CommentTitle'}})
        fireEvent.change(commentBodyInput, { target: { value: 'CommentBody'}});

        expect(commentTitleInput).toHaveValue('CommentTitle');
        expect(commentBodyInput).toHaveValue('CommentBody');
    });

    it('submits form', async () =>{
        mockedAxios.get.mockResolvedValue({
            data: { title: 'Post Title', body: 'Post Body'}
        })

        render(<BlogPost/>);

        await screen.findByText(/Post Title/);

        const commentTitleInput = screen.getByLabelText('Comment Title:');
        const commentBodyInput = screen.getByLabelText('Comment Body:');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(commentTitleInput, { target: { value: 'CommentTitle'}})
        fireEvent.change(commentBodyInput, { target: { value: 'CommentBody'}});

        fireEvent.click(submitButton);

        const titleEntry = await screen.findByText('CommentTitle');
        const bodyEntry = await screen.findByText('CommentBody');

        expect(titleEntry).toBeInTheDocument();
        expect(bodyEntry).toBeInTheDocument();
    });
});