import React, { useState, useEffect, useRef } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";

const Finder = ({ }) => {
  const { setSearch, search } = useStore();
  const searchInput = useRef("");
  const onSearch = () => {
    setSearch(searchInput.current.value);
  };
  return (
    <Maindiv>
      <Searchwrap>
        <input
          type="text"
          placeholder="  search..."
          ref={searchInput}
          onChange={onSearch}
        />
      </Searchwrap>
      <TaskLocalStyles />
    </Maindiv>
  );
};

export default Finder;

const TaskLocalStyles = createGlobalStyle`
input{
    width: 90%;
    height: 22px;
    padding: 2px 5px;
    margin: 5px -6px;
}
   `;
const Maindiv = styled.div`
  width: 40%;
  display: flex;
`;

const Searchwrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
