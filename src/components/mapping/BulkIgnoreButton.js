import * as React from 'react';
import { VisibilityOff } from '@material-ui/icons';
import { BulkUpdateButton } from 'react-admin';

const ResetViewsButton = (props) => (
    <BulkUpdateButton
        {...props}
        label="Reset Views"
        data={{ mapped: true }}
        icon={<VisibilityOff/>}
    />
);

export default ResetViewsButton;
