export function ContextProviderComposer({ components, children }) {
    return components.reduceRight((children, Component) => {
        return <Component>{children}</Component>
    }, children);
}