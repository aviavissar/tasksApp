import React, { useRef } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";

const Finder = () => {
  const { setSearch } = useStore();
  const searchInput = useRef("");
  const onSearch = () => {
    setSearch(searchInput.current.value);
  };
  return (
    <Maindiv>
      <Searchwrap>
        <SearchInput
          type="text"
          placeholder="  search..."
          ref={searchInput}
          onChange={onSearch}
        />
      </Searchwrap>
    </Maindiv>
  );
};

export default Finder;

const Maindiv = styled.div`
  width: 40%;
  display: flex;
`;
const Searchwrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const SearchInput = styled.input`
  width: 80%;
  height: 24px;
  padding: 2px 5px;
  margin: 5px -6px;
  border-radius: 3px;
`;
