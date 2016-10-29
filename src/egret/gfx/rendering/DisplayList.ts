//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

/**
 * @internal
 */
namespace elf {

    let tempMatrix = new Matrix();

    /**
     * @internal
     */
    export class DisplayList {
        public constructor(root:Node) {
            this.root = root;
            root.renderMatrix.identity();
        }

        private root:Node;
        public surface:Surface = null;
        public drawn:boolean = false;
        public stageHandle:any = null;

        public setStageHandle(handle:any):void {

        }

        private updateStageHandle(node:Node, handle:any):void {

        }


        private ignoreDirtyRect:boolean = false;
        private dirtyList:Rectangle[] = [];
        private clipRegion:Rectangle = null;

        public setClipRegion(rect:Rectangle):void {

        }

        /**
         * Marks an area as dirty.
         */
        public invalidateRect(rect:Rectangle):void {

        }

        private mergeDirtyList(forceMerge?:boolean):boolean {
            return false;
        }

        private clearDirtyList():void {

        }

        public region:Rectangle = new Rectangle();
        public dirtyTransform:boolean = true;
        public renderMatrix:Matrix = new Matrix();
        private offsetPoint:Point = null;
        private bounds:Rectangle = new Rectangle();

        /**
         * Updates the concatenatedMatrix and concatenatedAlpha properties, and caculates dirty regions.
         */
        public update(forceDirtyTransform?:boolean, clipRegion?:Rectangle) {

        }

        private updateBounds():void {

        }

        private lastRenderAlpha:number = 1;

        public updateRenderAlpha():void {

        }

        public resetSurface():void {

        }

        /**
         * Checks whether the display list need to call the render method. If yes, apply the renderMatrix and renderAlpha
         * then call the render method.
         */
        public renderCheck(context:RenderContext, clipRegion:Rectangle, offset?:Point):void {
            if(!clipRegion||clipRegion.intersects(this.region)){
                let m = this.renderMatrix;
                if (offset) {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx + offset.x, m.ty + offset.y);
                }
                else {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                context.globalAlpha = 1;
                this.render(context);
                this.drawn = true;
            }
        }
        /**
         * Draws the content to the specified render buffer.
         */
        public render(context:RenderContext):void {
            let bounds = this.bounds;
            if (!this.surface) {
                this.surface = context.surface.makeSurface(bounds.width(), bounds.height())
            }
            let displayContext = this.surface.context;
            let offset = this.offsetPoint;
            if (this.dirtyList.length > 0) {
                let root = this.root;
                for (let rect of this.dirtyList) {
                    displayContext.save();
                    if (offset) {
                        displayContext.setTransform(1, 0, 0, 1, offset.x, offset.y);
                    }
                    else {
                        displayContext.setTransform(1, 0, 0, 1, 0, 0);
                    }
                    displayContext.clearRect(rect.left, rect.top, rect.width(), rect.height());
                    displayContext.clipRect(rect.left, rect.top, rect.width(), rect.height());
                    systemRenderer.render(displayContext, root, rect, offset);
                    displayContext.restore();
                }
                this.clearDirtyList();
            }
            context.imageSmoothingEnabled = true;
            this.surface.drawTo(context, bounds.left, bounds.top);
        }

    }
}