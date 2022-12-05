import React from 'react';

// Styled components
import { AvatarContainer } from './avatar.styles';

// images
import dummyAvatar from './dummy-avatar.jpg';

export const Avatar = ({ imgUrl, username, displayUsername }) => {
    return (
        <AvatarContainer displayUsername={displayUsername ? true : false}>
            <img src={imgUrl ? imgUrl : dummyAvatar} alt={username} />
            {displayUsername && <p>{username ? username : 'username'}</p>}
        </AvatarContainer>
    );
};
