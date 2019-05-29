import withLayout from '../lib/withLayout';
import Counter from '../components/Counter';
import withAuth from '../lib/withAuth';

const Index = () => (
  <div>
    <h1 style={{ textAlign: 'center', margin: '100px' }}>nextjs firebase startkit</h1>
    <Counter />
  </div>
);

export default withAuth(withLayout(Index), { loginRequired: false });
