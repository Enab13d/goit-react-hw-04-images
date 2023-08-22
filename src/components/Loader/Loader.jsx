import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="100"
    width="180"
    radius="9"
    color="#FFBDD2"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ marginLeft: '50%', transform: 'translateX(-15%)' }}
    wrapperClassName=""
    visible={true}
  />
);
