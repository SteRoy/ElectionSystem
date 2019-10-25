import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Redirect } from 'react-router-dom';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{id: "edo", content: "Eduardo Enamorado"}, {id: "freddie", content: "Freddie Hyde"}, {id: "ron", content: "Re-Open Nominations"}],
            selected: [],
            redirect: false
        };

        this.id2List = {
            droppable: 'items',
            droppable2: 'selected'
        };
    }

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    submitBallot() {
        this.setState({
            redirect: true
        });
        return;
    }

    cancelBallot() {
        this.setState({
            error: ""
        });
        return;
    }

    attemptingToSubmit() {
        if (this.state.selected.length === 0) {
            this.setState({
                error: "You must select at least one candidate."
            });
        } else {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='card'>
                            <h5 className="card-title" style={{textAlign: "center"}}>Confirm your Ballot</h5>
                            <div className="card-body">
                                <p>First Preference: <b>{this.state.selected[0].content}</b></p>
                                <p>Second Preference: {this.state.selected[1] ? <b>{this.state.selected[1].content}</b> : <i>None Selected</i>}</p>
                                <p>Third Preference: {this.state.selected[2] ? <b>{this.state.selected[2].content}</b> : <i>None Selected</i>} </p>
                            </div>
                            <div className="card-footer">
                            <button
                                onClick={() => {
                                    this.submitBallot();
                                    onClose();
                                }}

                                className="btn btn-success"
                            >
                                Submit Ballot!
                            </button>

                            <button className="btn btn-danger" onClick={onClose}>Cancel/Amend</button>
                            </div>
                        </div>
                    );
                }
            });
        }
    }

    render() {
        return (
            <div className="container" style={{"textAlign": "center"}}>
                {this.state.redirect ? <Redirect to="/thanks" /> : ""}
                <h1>Durham Union Society Presidential Election</h1>
                <hr/>
                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : ""}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3>Available Candidates</h3>
                            <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                        </div>
                        <div className="col-sm-4"/>
                        <div className="col-sm-3" style={{paddingTop: "25px"}}>
                            <h3>Your Ballot</h3>
                            <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                        </div>
                    </div>
                </DragDropContext>
                <div className="row">
                    <div className="col-sm-3"/>
                    <div className="col-sm-4">
                        <br/>
                        <button className="btn btn-success" onClick={this.attemptingToSubmit.bind(this)}>Submit Ballot</button>
                    </div>
                    <div className="col-sm-3"/>
                </div>
            </div>
        )
    }
}

export default Vote;