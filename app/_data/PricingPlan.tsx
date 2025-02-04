const pricingPlans = [
    {
        link: process.env.REACT_APP_MONTHLY_PLAN_LINK,
        price: 7.99,
        priceId: process.env.REACT_APP_MONTHLY_PLAN_PRICE_ID,
        duration: 'Monthly'
    },
    {
        link: process.env.REACT_APP_YEARLY_PLAN_LINK,
        price: 50.00,
        priceId: process.env.REACT_APP_YEARLY_PLAN_PRICE_ID,
        duration: 'Yearly'
    }
];

export default pricingPlans;