import React, {  useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import TaskList from "./view/TaskList";
import Login from "./view/Signin";
import Signin from "./view/Login";
import Profile from "./view/Profile";
import CreateTask from "./view/CreateTask";
import styled from "styled-components/macro";
import { useStore } from "./state/Tasks.store";
import Finder from "./view/Finder";
import { isMobile } from "react-device-detect";
import { arrow } from "./my_svgs.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "33.33%",
    flexShrink: 0,
    margin: "5px 0",
    "min-height": "40px",
    "Mui-expanded": {
      "min-height": "40px",
      color: theme.palette.text.secondary,
    },
  },
}));

const App = () => {
  const { allTasks, userProfile, userTasks } = useStore();
  const classes = useStyles();
  const [, setExpanded] = useState(true);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <LoginPnl>
          <Login />
          <Signin />
        </LoginPnl>
        <Finder></Finder>
        <div className='logo'>Task App</div>
      </header>
      <Main>
        {userProfile ? (
          <Aside>
            <div>
              <Accordion
                defaultExpanded={isMobile ? false : true}
                //   expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={arrow()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.heading}
                >
                  <h2>userProfile</h2>
                </AccordionSummary>
                <AccordionDetails>
                  <Profile userProfile={userProfile} />
                </AccordionDetails>
              </Accordion>

              <Accordion
                //  expanded={expanded === "panel2"}
                defaultExpanded={isMobile ? false : true}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  className={classes.heading}
                  expandIcon={arrow()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <h2>CreateTask</h2>
                </AccordionSummary>
                <AccordionDetails>
                  <CreateTask />
                </AccordionDetails>
              </Accordion>

              <Accordion
                                defaultExpanded={true}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  className={classes.heading}
                  expandIcon={arrow()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <h2>my list</h2>
                </AccordionSummary>
                <AccordionDetails>
                  <TaskList
                    userlist={true}
                    tasks={userTasks}
                    userProfile={userProfile}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </Aside>
        ) : null}
        <AllTasks userProfile={userProfile}>
          <Accordion
            disabled={isMobile && userProfile?false:true}
            defaultExpanded={isMobile ? true : true}
                       onChange={handleChange("panel4")}
          >
            <AccordionSummary
              className={classes.heading}
              expandIcon={isMobile && userProfile?arrow():false}
             
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h2>list of all</h2>
            </AccordionSummary>
            <AccordionDetails>
              <TaskList tasks={allTasks} userProfile={userProfile} />
            </AccordionDetails>
          </Accordion>
        </AllTasks>
      </Main>
    </div>
  );
};

export default App;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  @media only screen and (max-width: 414px) {
    margin-left: 0px;
    flex-direction: column;
  }
`;

const Aside = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 15px;
  transition: 2s;

  @media only screen and (max-width: 414px) {
    margin: 0px;
    width: 100%;
  }
`;

const AllTasks = styled.div`
  display: flex;
  justify-content: space-around;
  transition: 2s;
  margin-left: ${({ userProfile }) => (userProfile && "25px") || "0px"};
  width: 100%;
  @media only screen and (max-width: 414px) {
    margin: 4px 0;
    width: 100%;
  }
`;

const LoginPnl = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 414px) {
    margin: 0px;
    width: 37%;
  }
`;
