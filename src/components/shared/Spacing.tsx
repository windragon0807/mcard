import styled from '@emotion/styled';

type Props = {
  size: number;
  direction?: 'vertical' | 'horizontal';
};

const Spacing = styled.div<Props>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}
`;

export default Spacing;
