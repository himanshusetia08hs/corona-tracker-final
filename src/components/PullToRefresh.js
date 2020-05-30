import * as React from "react";
import {PullToRefresh, ReleaseContent, RefreshContent, PullDownContent} from "react-js-pull-to-refresh";



export class Basic extends React.Component<BasicProps, BasicState> {
    onRefresh() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    render() {
        return (
            <div style={{overflow: "scroll"}}>
                <PullToRefresh
                    pullDownContent={<PullDownContent />}
                    releaseContent={<ReleaseContent />}
                    refreshContent={<RefreshContent />}
                    pullDownThreshold={200}
                    onRefresh={this.onRefresh}
                    triggerHeight={100}
                    backgroundColor="white"
                >
                    <div id="basic-container">
                        <div id="basic-label">PullToRefresh</div>
                    </div>
                    <style>{`
                        #basic-container {
                            height: 100vh;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background: darkslategray;
                        }
                        #basic-label {
                            user-select: none;
                            margin-top: 20px;
                            color: aliceblue;
                            border: 1px solid aliceblue;
                            border-radius: 6px;
                            padding: 5px 2px;
                        }
                        #basic-label:hover {
                            cursor: pointer;
                        }
                    `}</style>
                </PullToRefresh>
            </div>
        );
    }
}

export default PullToRefresh