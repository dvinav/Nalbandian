import * as React from 'react'
import { ViewLayoutTypes as VL } from '@utils/types'
import { ViewLayoutInterface } from '@utils/interfaces'

class ViewLayout extends React.Component<VL.Props, VL.State> implements ViewLayoutInterface {}

export default ViewLayout
