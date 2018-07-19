import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';


class SpotifyModal extends Component {
  constructor(props){
        super(props)
        this.state = {
          open: false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

      }


  componentDidMount() {
     this.props.onRef(this)
   }
   componentWillUnmount() {
     this.props.onRef(undefined)
   }
  onOpenModal() {
    this.setState({ open: true });
  };

  onCloseModal() {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="example">
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Your playlist is ready</h2>
          <img src={this.props.image} width='400' />
          <p>
            Head over to Spotify to check it out!
          </p>
          <Button variant="text" href={this.props.spotLink}>Let's go!</Button>
          <Button variant="text" onClick={this.onCloseModal}>close</Button>
        </Modal>
      </div>
    );
  }
}
export default SpotifyModal;
