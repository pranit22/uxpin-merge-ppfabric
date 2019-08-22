import * as React from 'react';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '../../../common/TestImages';
export const PersonaBasicExample = () => {
    const [renderDetails, updateRenderDetails] = React.useState(true);
    const onChange = (ev, checked) => {
        updateRenderDetails(!!checked);
    };
    const examplePersona = {
        imageUrl: TestImages.personaFemale,
        imageInitials: 'AL',
        text: 'Annie Lindqvist',
        secondaryText: 'Software Engineer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm'
    };
    return (<Stack tokens={{ childrenGap: 10 }}>
      <Checkbox label="Include persona details" checked={renderDetails} onChange={onChange}/>

      <Label>Size 8 Persona, with no presence</Label>
      <Persona {...examplePersona} size={PersonaSize.size8} hidePersonaDetails={!renderDetails}/>
      <Label>Size 8 Persona, with presence</Label>
      <Persona {...examplePersona} size={PersonaSize.size8} presence={PersonaPresence.offline} hidePersonaDetails={!renderDetails}/>
      <Label>Size 24 Persona</Label>
      <Persona {...examplePersona} size={PersonaSize.size24} presence={PersonaPresence.online} hidePersonaDetails={!renderDetails}/>
      <Label>Size 32 Persona</Label>
      <Persona {...examplePersona} size={PersonaSize.size32} presence={PersonaPresence.online} hidePersonaDetails={!renderDetails}/>

      <Label>Size 40 Persona</Label>
      <Persona {...examplePersona} size={PersonaSize.size40} presence={PersonaPresence.away} hidePersonaDetails={!renderDetails}/>

      <Label>Size 48 Persona (default) </Label>
      <Persona {...examplePersona} hidePersonaDetails={!renderDetails} presence={PersonaPresence.busy}/>

      <Label>Size 56 Persona (default) </Label>
      <Persona {...examplePersona} size={PersonaSize.size56} hidePersonaDetails={!renderDetails} presence={PersonaPresence.online}/>

      <Label>Size 72 Persona</Label>
      <Persona {...examplePersona} size={PersonaSize.size72} presence={PersonaPresence.dnd} hidePersonaDetails={!renderDetails}/>

      <Label>Size 100 Persona</Label>
      <Persona {...examplePersona} size={PersonaSize.size100} presence={PersonaPresence.blocked} hidePersonaDetails={!renderDetails}/>
    </Stack>);
};

export default PersonaBasicExample;
