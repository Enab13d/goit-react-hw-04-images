import styled from '@emotion/styled';
import { theme } from 'constants';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${theme.sizing(4)};
    padding-bottom: ${theme.sizing(6)};
`;