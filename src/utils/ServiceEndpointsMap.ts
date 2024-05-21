export const splitOrStealServiceEndpoints: { [key: string]: string } = {
    local: 'http://localhost:3030/',
    production: 'https://split-or-steal-service.azurewebsites.net/',
};

export const getCurrentServiceEndpoint = () => {
    const environment = import.meta.env.VITE_ENVIRONMENT;
    return (
        splitOrStealServiceEndpoints[environment] ||
        splitOrStealServiceEndpoints.local
    );
};
