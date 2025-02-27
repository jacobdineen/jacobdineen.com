import styled from "styled-components"

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--white)" : "var(--light-navy)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--slate)" : "var(--lightest-slate)"};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 15px 30px
    ${({ theme }) =>
      theme.mode === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.4)"};
  z-index: 1000;
  max-width: 90%;
  width: 450px;
  text-align: center;
  animation: popIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;

  @keyframes popIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin-bottom: 15px;
    font-size: 0.85rem;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "var(--lightest-slate)" : "var(--navy)"};
    padding: 15px;
    border-radius: 8px;
    text-align: left;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 0, 0, 0.05)"
          : "rgba(255, 255, 255, 0.05)"};
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--dark-slate)" : "var(--lightest-slate)"};
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 85%;

    pre {
      font-size: 0.75rem;
      padding: 10px;
    }
  }
`

export default PopupContainer
