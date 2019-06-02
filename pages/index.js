import styled from 'styled-components';
import withLayout from '../lib/withLayout';
import Counter from '../components/Counter';
import withAuth from '../lib/withAuth';

const Index = () => (
  <div>
    <Button>nextjs firebase startkit</Button>
    <Counter />
  </div>
);

const Button = styled.button`
  color: red;
  width: 200px;
  height: 50px;
  background: blue;
`;
export default withAuth(withLayout(Index), { loginRequired: false });
