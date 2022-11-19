import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchReposAction } from "./redux/slices/githubSlices";

const Repo = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.repos);

  const { reposList } = store;

  useEffect(() => {
    dispatch(fetchReposAction(user));
    console.log("first");
  }, [dispatch, user]);

  return (
    <div className="repos-container">
      <Link to="/"><button className="btn repos-btn">
        Go back
      </button></Link>
      {reposList?.name !== "Error" &&
        reposList?.map((repo) => (
          <div className="repos-card">
            <a
              href={repo?.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {repo?.name}
            </a>

            <div className="description">
              {repo?.description || "User Don't have description"}
            </div>
            <button className="btn">
              <a
                href={repo?.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View repository
              </a>
            </button>
          </div>
        ))}


    </div>
  );
};

export default Repo;
