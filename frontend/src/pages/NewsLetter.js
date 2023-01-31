import NewsletterSignup from "../components/NewsletterSignup/NewsLetterSignup";
import PageContent from "../components/PageContent/PageContent";

const NewsLetterPage = () => {
    return (
        <PageContent title='Join our newsletter!'>
            <NewsletterSignup />
        </PageContent>
    );
};

export default NewsLetterPage;

export const action = async ({request}) => {
    const data = await request.formData();
    const email = data.get('email');

    console.log(email);
    return {message: 'Signup successful!', email};
};