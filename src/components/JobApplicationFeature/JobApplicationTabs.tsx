import classNames from 'classnames'

type TabNavigationProps = {
  part: number;
  onPartChange: (part: number) => void;
  lastValidFormPart: number;
};

export const TabNavigation = (props: TabNavigationProps) => {
    const { part, onPartChange } = props
    return (
        <div className="flex border-b border-gray-200">
            <button
                className={classNames(
                    'px-4 py-2 border-b-2 font-medium focus:outline-none',
                    {
                        'bg-white border-blue-500 text-blue-500': part === 1,
                        'bg-gray-100 text-gray-700 border-transparent': part !== 1,
                    },
                )}
                onClick={() => onPartChange(1)}
            >
                Basic Details
            </button>
            <button
                className={classNames(
                    'px-4 py-2 border-b-2 font-medium focus:outline-none',
                    {
                        'bg-white border-blue-500 text-blue-500': part === 2,
                        'bg-gray-100 text-gray-700 border-transparent': part !== 2,
                        'opacity-50 cursor-not-allowed': props.lastValidFormPart < 2,
                    },
                )}
                onClick={() => {
                    if ( props.lastValidFormPart < 2 ) {
                        return
                    }
                    onPartChange(2)
                }}
            >
                Past Experience
            </button>
        </div>
    )
}