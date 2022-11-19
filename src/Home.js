import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "./redux/slices/githubSlices";
import {Link} from "react-router-dom"
import Loading from "./Loading";

function Home() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([])
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.repos);
  const { loading, users, error } = store;


  const fetchProfileInfo = async (name) => {
    try {
      const userInfo = await fetch("https://api.github.com/users/"+ name)
     const userData = await userInfo.json();
     setUserData(userData)
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfileInfo(user);
  }, [])
  
  return (
    <section class="home">
      <div className="search-section">
        <h2>Search Github Users</h2>
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchProfileAction(user));
            fetchProfileInfo(user)
          }}
        >
          <input
            onChange={(e) => setUser(e.target.value)}
            value={user}
            type="text"
            name="email"
            id="email"
            className="search-input"
            placeholder="Search For User"
          />
        </form>
      </div>
      {loading ? (
        <Loading/>
      ) : error ? (
        <h2 className="loading-text">
          {error?.data?.message}
        </h2>
      ) : (
        <>
          {users?.map((profile) => {
            return (
              <div className="user-card">
                <div className="user-card-up">
                  <img id="logo" src="https://img.icons8.com/material-sharp/24/null/github.png" />
                  <div className="user-image-container">
                    <img src={profile?.avatar_url} />
                  </div>
                </div>
                <div className="user-card-down">
                  <h3>{userData.name}</h3>
                  <h5>{userData.bio}</h5>
                  <Link to={`repo/${user}`}>
                <button className="search-btn btn">
                  View repos
                </button>
                </Link>
                </div>
                
              </div>
            )
          })}
        </>
      )}
    </section>
  );
}

export default Home;
