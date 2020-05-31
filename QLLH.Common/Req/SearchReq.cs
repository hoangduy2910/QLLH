using System;
using System.Collections.Generic;
using System.Text;

namespace QLLH.Common.Req
{
    public class SearchReq
    {
        public string keyword { get; set; }

        public int page { get; set; }

        public int size { get; set; }
    }
}
