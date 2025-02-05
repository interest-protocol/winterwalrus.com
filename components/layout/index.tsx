import { Main } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Main minHeight="100vh">{children}</Main>
);

export default Layout;
