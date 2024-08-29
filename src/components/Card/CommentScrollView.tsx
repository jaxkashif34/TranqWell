import { ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { ForumComment } from './ForumComment';
import { useAppDispatch, useAppSelector } from '~hooks';
import { selectCustomerState } from '~helpers';
import { getCDiscussionForumDetail } from '~redux';
import { ScreenLoader } from '../screenLoader/ScreenLoader';

type Props = {
  discussionForumId: number;
};

export const CommentScrollView = ({ discussionForumId }: Props) => {
  const { discussionComments, activeDiscussion } =
    useAppSelector(selectCustomerState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getActiveDiscussion = async () => {
      if (activeDiscussion === null) {
        await dispatch(getCDiscussionForumDetail(discussionForumId));
      }
    };
    getActiveDiscussion();
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      {discussionComments[discussionForumId]?.map((comment) => (
        <ForumComment
          key={comment.message.id}
          comment={{
            ...comment.message,
            discussion_id: comment.discussion_id,
          }}
        />
      ))}
      {!activeDiscussion ? (
        <ScreenLoader />
      ) : (
        activeDiscussion.comments.map((comment) => (
          <ForumComment key={comment.id} comment={comment} />
        ))
      )}
    </ScrollView>
  );
};
