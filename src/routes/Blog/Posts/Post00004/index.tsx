import React from "react";
import createPost from "../HOC/createPost";
import Email from "./Email";
import GithubPages from "./GithubPages";
import Plan from "./Plan";

const Content = () => {
  return (
    <div>
      <GithubPages />
      <Email />
      <Plan />
    </div>
  );
};

const postOverview = `This week, we've discovered a huge issue related to Github Pages. 
  Also, we haved finished the migration, now we're adding the new 
  functionalities: email, intergration between the face recognition of 
  the client and the server.`;

export default createPost(
  Content,
  "Week 3 Update",
  "01 September 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
