import { EntityView } from 'features/entity/EntityView';
import { NextPage } from 'next';
import { RecoilRoot } from 'recoil';

const IndexPage: NextPage = () => {
    return (
        <RecoilRoot>
            <EntityView />
        </RecoilRoot>
    );
};

export default IndexPage;
