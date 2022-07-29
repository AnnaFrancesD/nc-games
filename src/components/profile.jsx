import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as api from "../api";

export default function Profile() {
  const [currProfile, setCurrProfile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);
    api.fetchUser(currentUser).then((user) => {
      setCurrProfile(user);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="profile-container">
        <h2>My Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className="profile-card">
            <img
              id="avatar"
              src={currProfile.avatar_url}
              alt={currProfile.name + "'s avatar"}
            ></img>
            <p>Name: {currProfile.name}</p>
            <p>username: {currProfile.username}</p>
          </section>
        )}
      </div>
    </>
  );
}
