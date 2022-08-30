import React from 'react';
const AuthorAvatar = ({ username, color }) => {
    return <div className='tb_author_avatar__' style={{backgroundColor: color ? color : '#000000' , fontFamily: 'Inter', fontWeight: 600 }}>
            {(username && username.length > 0) && username.charAt(0).toUpperCase()}
        </div>
}

export default AuthorAvatar;