import React , {useEffect} from 'react'

const Header = ({location, setTemplateName, templateData, templateName}) => {

    useEffect(() => {
        if (location.state.selectedValue != null) {
          templateData.name = location.state.selectedValue;
        } else if (location.state.newWorkflow != null) {
          setTemplateName(location.state.newWorkflow);
        } else {
          setTemplateName("Default Workflow");
        }
      }, []);
    return (
       
      <header>
        <div className="spacer">&nbsp;</div>
        <br />
        <br /> <br />
        <div className="container-small">
          {location.state.selectedValue != null
            ? location.state.selectedValue
            : templateName}
        </div>
      </header>
    )
}

export default Header
