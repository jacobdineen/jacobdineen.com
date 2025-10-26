import styled from "styled-components"

const PublicationListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid
    ${({ isActive }) => (isActive ? "transparent" : "var(--lightest-navy)")};
  background: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.10) 100%)"
        : "linear-gradient(135deg, rgba(0,201,255,0.12) 0%, rgba(146,254,157,0.10) 100%)"
      : theme.mode === "light"
      ? "rgba(255,255,255,0.04)"
      : "rgba(17,34,64,0.7)"};
  color: ${({ theme }) => (theme.mode === "light" ? "#475569" : "#94a3b8")};
  transition: transform 0.2s var(--easing), box-shadow 0.2s var(--easing),
    border-color 0.2s var(--easing), background 0.2s var(--easing);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -16px var(--navy-shadow);
    border-color: transparent;
  }

  .title {
    font-size: 0.95rem;
    color: var(--lightest-slate);
    margin-bottom: 8px;
    line-height: 1.35;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: var(--slate);

    .chip {
      border: 1px solid var(--lightest-navy);
      color: var(--green);
      font-family: var(--font-mono);
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(100, 255, 218, 0.08);
    }

    .date {
      opacity: 0.8;
    }

    a.chip-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 999px;
      border: 1px solid rgba(100, 255, 218, 0.45);
      color: var(--green);
      text-decoration: none;
      transition: all 0.2s var(--easing);
      background: rgba(100, 255, 218, 0.06);

      svg {
        width: 14px;
        height: 14px;
        display: block;
      }

      &:hover {
        border-color: var(--green);
        transform: translateY(-1px);
      }
    }
  }

  /* subtle active indicator */
  ${props =>
    props.isActive &&
    `
      box-shadow: 0 10px 28px -18px var(--navy-shadow), inset 0 0 0 1px rgba(100,255,218,0.15);
    `}

  @media (max-width: 768px) {
    padding: 10px 14px;
    .title {
      font-size: 0.9rem;
    }
    .meta {
      font-size: 0.72rem;
    }
  }
`

export default PublicationListItem
