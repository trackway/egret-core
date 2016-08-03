
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import FileUtil = require('../lib/FileUtil');
import CompileLark = require("../actions/CompileLark");

class MakeCommand implements egret.Command {
    execute():number {
        var options = egret.args;
        
        var compiler = new CompileLark();
        return compiler.make();
    }
}

export = MakeCommand;