import { css, StyleSheet } from "aphrodite";
import React from "react";
import { IBasicUserInfoProps } from "../interfaces";
import ClassroomInfo from "./ClassroomInfo";
import Divider from "./Divider";
import SkillTags from "./SkillTags";

const BasicUserInfo = ({
  avatar,
  username,
  classrooms,
  studentClassrooms,
  skills,
  self
}: IBasicUserInfoProps) => {
  console.log(studentClassrooms)
  return (
    <div>
      <img className={css(styles.avatar)} src={avatar} />
      <div className={css(styles.username)}>@{username}</div>
      {studentClassrooms && studentClassrooms.length > 0 && (
        <div>
          <Divider name="Classes" />
          {studentClassrooms.map(classroom => (
            <ClassroomInfo
              key={classroom.Id}
              name={classroom.name}
              description={classroom.description}
            />
          ))}
        </div>
      )}
      {classrooms && classrooms.length > 0 && (
        <div>
          <Divider name="Classes Taught" />
          {classrooms.map(classroom => (
            <ClassroomInfo
              key={classroom.Id}
              name={classroom.name}
              description={classroom.description}
            />
          ))}
        </div>
      )}
      {skills && (skills.length > 0 || self) && (
        <React.Fragment>
          <Divider name="Skills" />
          <div>
            <SkillTags self={self} skills={skills} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    borderRadius: "4px",
    marginBottom: "8px"
  },
  username: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "24px",
    color: "#666"
  },
  tag: {
    marginBottom: "8px"
  }
});

export default BasicUserInfo
