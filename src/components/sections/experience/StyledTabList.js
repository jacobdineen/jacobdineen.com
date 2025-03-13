import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 10px 0 15px 0;
  font-size: var(--fz-lg);

  /* The container for the tab buttons */
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px 40px;
    margin: 0 auto;
    width: 100%;
    max-width: 320px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 280px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* Smooth scrolling */
    scroll-behavior: smooth;
    position: relative;

    /* Subtle gradient fade at top and bottom to indicate scrollable content */
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 5%,
      black 95%,
      transparent 100%
    );

    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* Left arrow - pointing up */
  > button:first-of-type {
    position: absolute;
    left: calc(50% - 160px - 25px);
    top: 50%;
    transform: translateY(-50%) rotate(270deg); /* 270deg = pointing up */
    z-index: 2;
    margin: 0;
  }

  /* Right arrow - pointing down */
  > button:last-of-type {
    position: absolute;
    right: calc(50% - 160px - 25px);
    top: 50%;
    transform: translateY(-50%) rotate(90deg); /* 90deg = pointing down */
    z-index: 2;
    margin: 0;
  }

  @media (max-width: 768px) {
    > div {
      -webkit-overflow-scrolling: touch;
      max-width: 280px;
      max-height: 250px;
      padding: 8px 40px;
    }

    > button:first-of-type {
      left: calc(50% - 140px - 25px);
    }

    > button:last-of-type {
      right: calc(50% - 140px - 25px);
    }
  }

  @media (max-width: 480px) {
    padding: 8px 0 12px 0;

    > div {
      max-width: 240px;
      max-height: 230px;
      gap: 5px;
    }

    > button:first-of-type {
      left: calc(50% - 120px - 25px);
    }

    > button:last-of-type {
      right: calc(50% - 120px - 25px);
    }
  }
`

export default StyledTabList
