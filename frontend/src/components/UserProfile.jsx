function UserProfile(props) {
    return (
        <>
            <div className="user-profile">
                <div className="user-profile-wrapper">
                    <img src="/images/profile-picture.jpg" alt="user-profile" />
                </div>
                <h1>{props.name}</h1>
                <p>{props.aboutMe.length > 315 ? props.aboutMe.slice(0, 315) : props.aboutMe}...</p>
                <button><i className="fa-solid fa-xmark fa-2xl" style={{color: "grey"}}></i></button>
                <button><i className="fa-solid fa-heart fa-2xl" style={{color: "#ff2600"}}></i></button>
            </div>
        </>
    )
}

export default UserProfile;