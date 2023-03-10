import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from 'src/redux/store';

import type { CommentType } from 'src/types/bookStoreTypes';

import socket from 'src/utils/socket';
import commentApi from 'src/api/requests/commentApi';

import Button from 'src/ui/components/Button';
import ItemComment from './itemComment';

import StyledComments from './Comments.styles';

const Comments: React.FC = () => {
  const { bookId } = useParams();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);

  const user = useAppSelector((store) => store.userStore.user);

  useEffect(() => {
    socket.socket.on('getComment', (data: CommentType) => {
      setComments((items) => {
        return [...items, data];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const comments = await commentApi.getComments(Number(bookId));
        setComments(comments.data);
      } catch (err) {
        const error = err as Error;
        toast.error(error.message);
      }
    })();
  }, [bookId]);

  const handlerChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handlerSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() && user) {
      socket.socket.emit('addComment', {
        userId: user.id,
        bookId: Number(bookId),
        text: comment,
      });
    }
    setComment('');
  };

  return (
    <StyledComments>
      {comments.length || user ? (
        <h2 className="comments-box__title">Comments</h2>
      ) : (
        ''
      )}
      <div className="comments-box">
        {comments &&
          comments.map((comment) => (
            <ItemComment
              authorName={comment.user?.fullName}
              date={comment.createdTime}
              img={comment.user.avatar}
              text={comment.text}
              key={comment.id}
            />
          ))}
      </div>

      {user && (
        <form onSubmit={handlerSubmitForm} className="comment-box__form">
          <textarea
            onChange={handlerChangeInput}
            value={comment}
            className="comment-box__input"
            placeholder="Share a comment"
          />
          <Button className="comment-box__button">Post a comment</Button>
        </form>
      )}
    </StyledComments>
  );
};

export default Comments;
