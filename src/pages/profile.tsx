import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Profile = ({ user }: any) => {
    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            <pre className='mt-4 p-4 bg-gray-100 rounded'>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
